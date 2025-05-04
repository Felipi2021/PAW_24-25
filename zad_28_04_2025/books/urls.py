from django.urls import path
from . import views

urlpatterns = [
    path('', views.BookListView.as_view(), name='book-list'),
    path('book/<int:pk>/', views.BookDetailView.as_view(), name='book-detail'),
    path('book/new/', views.book_create_view, name='book-create'),
    
    path('loans/', views.LoanListView.as_view(), name='loan-list'),
    path('loan/<int:pk>/', views.LoanDetailView.as_view(), name='loan-detail'),
    path('loan/new/', views.loan_create_view, name='loan-create'),
    path('loan/<int:pk>/return/', views.return_book, name='return-book'),
]