from django import forms
from .models import Book, Author, Loan
from datetime import timedelta
from django.utils import timezone


class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ['title', 'author', 'description', 'pub_date', 'genre', 'isbn', 'available']
        widgets = {
            'pub_date': forms.DateInput(attrs={'type': 'date'}),
            'description': forms.Textarea(attrs={'rows': 4}),
        }
        
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['author'].queryset = Author.objects.all().order_by('name')


class LoanForm(forms.ModelForm):
    class Meta:
        model = Loan
        fields = ['book', 'borrower_name', 'borrower_email', 'loan_date', 'due_date', 'notes']
        widgets = {
            'loan_date': forms.DateInput(attrs={'type': 'date'}),
            'due_date': forms.DateInput(attrs={'type': 'date'}),
            'notes': forms.Textarea(attrs={'rows': 3}),
        }
        
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        if not kwargs.get('instance'):
            self.fields['book'].queryset = Book.objects.filter(available=True)
            
            self.fields['due_date'].initial = timezone.now().date() + timedelta(days=14)
        
    def clean(self):
        cleaned_data = super().clean()
        loan_date = cleaned_data.get('loan_date')
        due_date = cleaned_data.get('due_date')
        
        if loan_date and due_date and due_date < loan_date:
            raise forms.ValidationError("Due date cannot be earlier than the loan date.")