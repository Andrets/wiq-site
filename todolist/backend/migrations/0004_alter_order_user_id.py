# Generated by Django 4.2.6 on 2023-10-17 12:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_alter_order_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='user_id',
            field=models.CharField(default=1, max_length=255),
        ),
    ]
