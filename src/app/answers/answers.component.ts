import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router, NavigationExtras } from '@angular/router';

import { DataService } from '../data.service';
import { Answer } from 'src/models/answers';
import Swal from 'sweetalert2';

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
  userVotes: number[] = [];

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
      queryParams: { refresh: true },
    };
    // use the router to navigate to the current route with the navigation extras
    this.router.navigate([], navigationExtras).then(() => {
      // reload the data for the component after the navigation is complete
      this.getAnswersByQuestionId(this.currentQuestion.id);
    });
  }
  downvoteAnswer(id: number) {
    this.dataService.downvoteAnswer(id);
    const navigationExtras: NavigationExtras = {
      queryParams: { refresh: true },
    };
    // use the router to navigate to the current route with the navigation extras
    this.router.navigate([], navigationExtras).then(() => {
      // reload the data for the component after the navigation is complete
      this.getAnswersByQuestionId(this.currentQuestion.id);
    });
  }

  deleteAnswer(id: number) {
    this.dataService.deleteAnswer(id);
    const navigationExtras: NavigationExtras = {
      queryParams: { refresh: true },
    };
    // use the router to navigate to the current route with the navigation extras
    this.router.navigate([], navigationExtras).then(() => {
      // reload the data for the component after the navigation is complete
      this.getAnswersByQuestionId(this.currentQuestion.id);
    });
  }
  newText: string = '';

  editAnswer(id: number, newText: string): void {
    const answer = this.answers.find((answer: Answer) => answer.id === id);
    if (answer) {
      Swal.fire({
        title: 'Enter the new answer text:',
        input: 'text',
        inputValue: answer.text,
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          const newText = result.value;
          this.dataService.editAnswer(id, newText);
          Swal.fire('Answer edited!', '', 'success');
          const navigationExtras: NavigationExtras = {
            queryParams: { refresh: true },
          };
          // use the router to navigate to the current route with the navigation extras
          this.router.navigate([], navigationExtras).then(() => {
            // reload the data for the component after the navigation is complete
            this.getAnswersByQuestionId(this.currentQuestion.id);
          });
        }
      });
    }
  }

  editedAnswerId: number | null = null;

  //admin user
  isAdminUser = this.authService.currentLoggedInAdmin;
}
