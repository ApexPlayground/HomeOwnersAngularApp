import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

import { DataService } from '../data.service';

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

}
