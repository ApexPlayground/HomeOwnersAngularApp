import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NavigationExtras } from '@angular/router';

import { DataService } from '../data.service';
import { Question } from 'src/models/questions';

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
    this.dataService.deleteQuestion(id);
    const navigationExtras: NavigationExtras = {
      queryParams: { 'refresh': true }
    };
    // use the router to navigate to the current route with the navigation extras
    this.router.navigate([], navigationExtras)
      .then(() => {
        // reload the data for the component after the navigation is complete
        // this.dataService
        // this.getQuestionById(this.currentQuestion.id);
      });

  }
  newText: string = '';

  editQuestion(id: any, newText: string): void {
    const questions = this.questions.find((questions: Question) => questions.id === id);
    if (questions) {
      const newText = prompt('Enter the new answer text:', questions.text);
      if (newText !== null) {
        this.dataService.editAnswer(id, newText);
        const navigationExtras: NavigationExtras = {
          queryParams: { 'refresh': true }
        };
        // use the router to navigate to the current route with the navigation extras
        this.router.navigate([], navigationExtras)
          .then(() => {
            // reload the data for the component after the navigation is complete
            // this.getAnswersByQuestionId(this.currentQuestion.id);
          });
      }
    }
  }

  editedAnswerId: number | null = null;


}
