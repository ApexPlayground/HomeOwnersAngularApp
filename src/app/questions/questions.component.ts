import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NavigationExtras } from '@angular/router';

import { DataService } from '../data.service';
import { Question } from 'src/models/questions';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions: any;

  constructor(private dataService: DataService, private router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.questions = this.dataService.getQuestions();
  }

  askQuestion(question: HTMLInputElement) {
    debugger;
    if (!question.value) {
      return;
    }

    this.dataService.addQuestion(question.value, this.authService.currentLoggedInUser.id);
    question.value = '';
    this.questions = this.dataService.getQuestions();
  }

  navigateToAnswer(question: any) {
    this.router.navigate(['/answers', 'question', question.id]);
  }

  deleteQuestion(id: any) {
    const questionIndex = this.questions.findIndex((q: Question) => q.id === id);
    if (questionIndex !== -1) {
      this.questions.splice(questionIndex, 1);
      this.dataService.deleteQuestion(id);
      this.router.navigate([], { queryParams: { refresh: true } });
    }
  }

  newText: string = '';

  editQuestion(id: any, newText: string) {
    const questionIndex = this.questions.findIndex((q: Question) => q.id === id);
    if (questionIndex !== -1) {
      const question = this.questions[questionIndex];
      Swal.fire({
        title: 'Edit Question',
        input: 'text',
        inputValue: question.text,
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed && result.value !== '') {
          const newQuestionText = result.value;
          this.questions[questionIndex].text = newQuestionText;
          this.dataService.editQuestion(id, newQuestionText);
          this.router.navigate([], { queryParams: { refresh: true } });
        }
      });
    }
    this.editedQuestionId = null; // Reset the editedQuestionId
  }

  editedQuestionId: number | null = null;

}  