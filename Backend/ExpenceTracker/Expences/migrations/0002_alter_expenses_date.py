# Generated by Django 5.1.4 on 2025-01-10 15:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Expences', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expenses',
            name='date',
            field=models.DateField(),
        ),
    ]