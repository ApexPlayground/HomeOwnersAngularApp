import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import { DataService } from '../data.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css'],
})
export class AnswersComponent implements OnInit {
  answers: any;
  currentQuestion: any;
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    public authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const questionId = Number(params['id']);
      if (questionId) {
        this.currentQuestion = this.dataService.getQuestionById(questionId);
        this.getAnswersByQuestionId(questionId);
      }
    });
  }

  addAnswer(answer: HTMLTextAreaElement) {
    if (!answer.value) {
      return;
    }

    this.dataService.addAnswer(
      this.currentQuestion.id,
      answer.value,
      this.authService.currentLoggedInUser.id
    );
    this.getAnswersByQuestionId(this.currentQuestion.id);
    answer.value = '';
  }

  getAnswersByQuestionId(id: number) {
    this.answers = this.dataService.getAnswersById(id);
  }

  upvoteAnswer(id: number) {
    this.dataService.upvoteAnswer(id);
    this.router.navigate(['/']);
    this.router.navigate([this.router.url]);
  }
}
