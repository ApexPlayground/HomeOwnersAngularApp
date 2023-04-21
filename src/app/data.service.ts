import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  questions = [{
    text: 'Best places to visit in Newcastle?',
    id: 1,
    userId: 1
  }, {
    text: 'Best food to eat in Mumbai?',
    id: 2,
    userId: 2
  }];

  answers = [{
    id: 1,
    questionId: 1,
    text: 'City Center, River Tyne',
    userId: 3
  },
  {
    id: 1,
    questionId: 1,
    text: 'Gateshead, Quayside',
    userId: 2
  },
  {
    id: 1,
    questionId: 2,
    text: 'Vadapaav, Pani puri, Paav bhaji, Misal etc',
    userId: 3
  }];

  constructor(private authService: AuthService) { }

  getQuestionById(id: any) {
    const question: any = this.questions.find(question => question.id === id);
    const user: any = this.authService.getUser(question.userId);
    return {
      ...question,
      userName: user.name,
      userId: user.id
    }
  }

  getQuestions() {
    return this.questions.map((question: any) => {
      return {
        ...question,
        user: this.authService.getUser(question.userId)
      }
    });
  }

  addQuestion(question: string, userId: number) {
    const id = this.questions.length + 1;
    this.questions.push({ text: question, id, userId });
    return true;
  }

  addAnswer(questionId: number, answer: string, userId: number) {
    const id = this.answers.length + 1;
    this.answers.push({
      id,
      questionId,
      text: answer,
      userId
    });
    return true;
  }

  getAnswersById(questionId?: number) {
    if (!questionId) {
      return this.answers;
    }

    return this.answers
      .filter(answer => answer.questionId === questionId)
      .map((answer: any) => {
        return {
          ...answer,
          user: this.authService.getUser(answer.userId)
        }
      });
  }
}
