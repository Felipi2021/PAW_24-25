from django.contrib import admin
from .models import Book, Author, Loan


class LoanInline(admin.TabularInline):
    model = Loan
    extra = 0
    fields = ('borrower_name', 'loan_date', 'due_date', 'status')
    readonly_fields = ('loan_date',)


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('name', 'birth_date')
    search_fields = ('name',)
    list_filter = ('birth_date',)


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'genre', 'available')
    list_filter = ('genre', 'available', 'pub_date')
    search_fields = ('title', 'author__name', 'isbn')
    autocomplete_fields = ('author',)
    inlines = [LoanInline]


@admin.register(Loan)
class LoanAdmin(admin.ModelAdmin):
    list_display = ('book', 'borrower_name', 'loan_date', 'due_date', 'status')
    list_filter = ('status', 'loan_date', 'due_date')
    search_fields = ('book__title', 'borrower_name', 'borrower_email')
    readonly_fields = ('loan_date',)
    fieldsets = (
        ('Book Information', {'fields': ('book',)}),
        ('Borrower Information', {'fields': ('borrower_name', 'borrower_email')}),
        ('Loan Details', {'fields': ('loan_date', 'due_date', 'return_date', 'status', 'notes')}),
    )