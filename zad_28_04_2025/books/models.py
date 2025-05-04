from django.db import models
from django.urls import reverse
from django.utils import timezone
from django.contrib.auth.models import User


class Author(models.Model):
    name = models.CharField(max_length=200)
    bio = models.TextField(blank=True)
    birth_date = models.DateField(null=True, blank=True)
    
    def __str__(self):
        return self.name
    
    def get_absolute_url(self):
        return reverse('author-detail', args=[str(self.id)])


class Book(models.Model):
    GENRE_CHOICES = [
        ('fiction', 'Fiction'),
        ('non_fiction', 'Non-Fiction'),
        ('sci_fi', 'Science Fiction'),
        ('fantasy', 'Fantasy'),
        ('mystery', 'Mystery'),
        ('biography', 'Biography'),
        ('history', 'History'),
        ('other', 'Other'),
    ]
    
    title = models.CharField(max_length=200)
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='books')
    description = models.TextField(blank=True)
    pub_date = models.DateField('Publication Date', null=True, blank=True)
    genre = models.CharField(max_length=20, choices=GENRE_CHOICES, default='other')
    isbn = models.CharField('ISBN', max_length=13, blank=True)
    available = models.BooleanField(default=True)
    
    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse('book-detail', args=[str(self.id)])


class Loan(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('returned', 'Returned'),
        ('overdue', 'Overdue'),
    ]
    
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='loans')
    borrower_name = models.CharField(max_length=100)
    borrower_email = models.EmailField(blank=True)
    loan_date = models.DateField(default=timezone.now)
    due_date = models.DateField()
    return_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')
    notes = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.book.title} - {self.borrower_name}"
    
    def save(self, *args, **kwargs):
        
        is_new = self.pk is None
        
        
        super().save(*args, **kwargs)
        
        if is_new or self.status == 'active':
            self.book.available = False
            self.book.save()
        elif self.status == 'returned':
            
            active_loans = Loan.objects.filter(book=self.book, status='active').exclude(pk=self.pk).count()
            if active_loans == 0:
                self.book.available = True
                self.book.save()
    
    def get_absolute_url(self):
        return reverse('loan-detail', args=[str(self.id)])