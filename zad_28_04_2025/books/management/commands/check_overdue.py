from django.core.management.base import BaseCommand
from django.utils import timezone
from books.models import Loan


class Command(BaseCommand):
    help = 'Checks for overdue loans and updates their status'

    def handle(self, *args, **options):
        today = timezone.now().date()
        
        
        overdue_loans = Loan.objects.filter(
            status='active',
            due_date__lt=today
        )
        
        count = overdue_loans.count()
        
        
        overdue_loans.update(status='overdue')
        
        self.stdout.write(
            self.style.SUCCESS(f'Successfully marked {count} loans as overdue')
        ) 