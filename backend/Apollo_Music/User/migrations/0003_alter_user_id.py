# Generated by Django 3.2 on 2021-05-01 13:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0002_auto_20210429_1502'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]
