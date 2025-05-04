from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic import ListView, DetailView, UpdateView
from django.contrib import messages
from django.urls import reverse_lazy
from django.utils import timezone
from .models import Book, Author, Loan
from .forms import BookForm, LoanForm

class BookListView(ListView):
    model = Book
    template_name = 'book_list.html'
    context_object_name = 'books'
    ordering = ['title']

class BookDetailView(DetailView):
    model = Book
    template_name = 'book_detail.html'
    context_object_name = 'book'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['loans'] = Loan.objects.filter(book=self.object).order_by('-loan_date')[:5]
        return context

def book_create_view(request):
    if request.method == 'POST':
        form = BookForm(request.POST)
        if form.is_valid():
            book = form.save()
            messages.success(request, f'Book "{book.title}" has been created!')
            return redirect('book-detail', pk=book.pk)
    else:
        form = BookForm()
    
    return render(request, 'book_form.html', {'form': form, 'form_title': 'Add New Book'})

class LoanListView(ListView):
    model = Loan
    template_name = 'loan_list.html'
    context_object_name = 'loans'
    ordering = ['-loan_date']
    
    def get_queryset(self):
        queryset = super().get_queryset()
        status = self.request.GET.get('status')
        if status:
            queryset = queryset.filter(status=status)
        return queryset
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['active_loans'] = Loan.objects.filter(status='active').count()
        context['overdue_loans'] = Loan.objects.filter(status='overdue').count()
        return context

class LoanDetailView(DetailView):
    model = Loan
    template_name = 'loan_detail.html'
    context_object_name = 'loan'

def loan_create_view(request):
    if request.method == 'POST':
        form = LoanForm(request.POST)
        if form.is_valid():
            loan = form.save(commit=False)
            loan.status = 'active'
            loan.save()  # This will also update book availability
            messages.success(request, f'Loan for "{loan.book.title}" has been created!')
            return redirect('loan-detail', pk=loan.pk)
    else:
        form = LoanForm()
    
    return render(request, 'loan_form.html', {'form': form, 'form_title': 'Create New Loan'})

def return_book(request, pk):
    loan = get_object_or_404(Loan, pk=pk)
    
    if request.method == 'POST':
        if loan.status in ['active', 'overdue']:
            loan.status = 'returned'
            loan.return_date = timezone.now().date()
            loan.save()
            messages.success(request, f'Book "{loan.book.title}" has been returned successfully!')
            return redirect('loan-list')
        else:
            messages.error(request, 'This book has already been returned.')
            return redirect('loan-detail', pk=loan.pk)
    
    return render(request, 'return_book.html', {'loan': loan}) 