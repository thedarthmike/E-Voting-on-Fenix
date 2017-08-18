# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-08-18 12:35
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Credential',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('credential', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Election',
            fields=[
                ('id', models.UUIDField(primary_key=True, serialize=False)),
                ('endDate', models.DateTimeField()),
            ],
        ),
        migrations.AddField(
            model_name='credential',
            name='election',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Registration.Election'),
        ),
        migrations.AlterUniqueTogether(
            name='credential',
            unique_together=set([('election', 'credential')]),
        ),
    ]
