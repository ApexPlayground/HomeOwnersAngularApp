import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router, NavigationExtras } from '@angular/router';

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
    private router: Router
  ) { }


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
    const navigationExtras: NavigationExtras = {
      queryParams: { 'refresh': true }
    };
    // use the router to navigate to the current route with the navigation extras
    this.router.navigate([], navigationExtras)
      .then(() => {
        // reload the data for the component after the navigation is complete
        this.getAnswersByQuestionId(this.currentQuestion.id);
      });
  }
  downvoteAnswer(id: number) {
    this.dataService.downvoteAnswer(id);
    const navigationExtras: NavigationExtras = {
      queryParams: { 'refresh': true }
    };
    // use the router to navigate to the current route with the navigation extras
    this.router.navigate([], navigationExtras)
      .then(() => {
        // reload the data for the component after the navigation is complete
        this.getAnswersByQuestionId(this.currentQuestion.id);
      });
  }

  deleteAnswer(id: number) {
    this.dataService.deleteAnswer(id);
    const navigationExtras: NavigationExtras = {
      queryParams: { 'refresh': true }
    };
    // use the router to navigate to the current route with the navigation extras
    this.router.navigate([], navigationExtras)
      .then(() => {
        // reload the data for the component after the navigation is complete
        this.getAnswersByQuestionId(this.currentQuestion.id);
      });

  }

}
