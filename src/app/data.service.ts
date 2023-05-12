import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { error } from 'console';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  questions = [
    {
      text: 'How to ride a bike?',
      id: 1,
      userId: 1,
    },
    {
      text: 'How to play a guitar?',
      id: 2,
      userId: 2,
    },
  ];

  answers = [
    {
      id: 1,
      questionId: 1,
      text: "To ride a bike, start by choosing a bike that fits you well. Find a safe, open area to practice, and put on a helmet for safety. Begin by straddling the bike and getting a feel for balance by lifting your feet off the ground. When you're ready, push off with one foot and start pedaling. Use your brakes to control your speed and gently lean and turn the handlebars to steer. Practice regularly to improve your skills and gradually increase your confidence. Enjoy the freedom and fun that riding a bike brings!",
      userId: 3,
      upvote: 0,
      downvote: 0,
      comments: [
        {
          id: 1,
          text: 'Great explanation!',
          userId: 4,


        },
        {
          id: 2,
          text: 'I have a question about braking, can you provide more details?',
          userId: 5,

        },
      ],
    },
    {
      id: 2,
      questionId: 1,
      text: 'Put your leg on the pedal and start riding',
      userId: 2,
      upvote: 0,
      downvote: 0,
      comments: [
        {
          id: 1,
          text: 'Great explanation!',
          userId: 4,

        },
        {
          id: 2,
          text: 'I have a question about braking, can you provide more details?',
          userId: 5,

        },
      ],
    },
    {
      id: 3,
      questionId: 2,
      text: 'To play the guitar, follow these simple steps. First, hold the guitar correctly by placing your dominant hand on the neck and your other hand on the body. Learn the basic chords, such as E, A, D, G, and C, which are essential for many songs. Practice transitioning between chords smoothly and accurately. Next, work on your strumming technique by using a pick or your fingers to strike the strings in a rhythmic pattern. Start with simple strumming patterns and gradually increase the complexity as you progress. Additionally, learn to read guitar tablature or sheet music to play melodies and solos. Practice regularly to build strength, dexterity, and muscle memory. Utilize online tutorials, instructional books, or seek guidance from a guitar teacher to enhance your learning experience. Finally, enjoy the process and have fun exploring the endless possibilities of creating music with your guitar.',
      userId: 3,
      upvote: 0,
      downvote: 0,
      comments: [
        {
          id: 1,
          text: 'Great explanation!',
          userId: 4,

        },
        {
          id: 2,
          text: 'I have a question about braking, can you provide more details?',
          userId: 5,

        },
      ],
    },
  ];



  constructor(private authService: AuthService) { }

  getQuestionById(id: any) {
    const question: any = this.questions.find((question) => question.id === id);
    const user: any = this.authService.getUser(question.userId);
    return {
      ...question,
      userName: user.name,
      userId: user.id,
    };
  }

  getQuestions() {
    return this.questions.map((question: any) => {
      return {
        ...question,
        user: this.authService.getUser(question.userId),
      };
    });
  }

  addQuestion(question: string, userId: number) {
    const id = this.questions.length + 1;
    this.questions.push({ text: question, id, userId });
    return true;
  }

  addAnswer(questionId: number, answer: string, userId: number) {
    const id = this.answers.length + 1;
    const upvote = 0;
    const downvote = 0;
    this.answers.push({
      id,
      questionId,
      text: answer,
      userId,
      upvote,
      downvote,
      comments: [],
    });
    return true;
  }

  getAnswersById(questionId?: number) {
    if (!questionId) {
      return this.answers;
    }

    return this.answers
      .filter((answer) => answer.questionId === questionId)
      .map((answer: any) => {
        return {
          ...answer,
          user: this.authService.getUser(answer.userId),
          comments: this.getCommentsByAnswerId(answer.id)

        };
      });
  }

  upvoteAnswer(id: number) {
    const answer = this.answers.find((a) => a.id === id);
    if (answer) {
      answer.upvote = (answer.upvote || 0) + 1;
    }
  }

  downvoteAnswer(id: number) {
    const answer = this.answers.find((a) => a.id === id);
    if (answer) {
      answer.upvote = (answer.upvote || 0) - 1;
    }
  }

  deleteAnswer(answerId: number): void {
    const answerIndex = this.answers.findIndex((answer) => answer.id === answerId);
    if (answerIndex !== -1) {
      this.answers.splice(answerIndex, 1);
    }
  }

  editAnswer(id: number, newText: string): void {
    const answer = this.answers.find((answer) => answer.id === id);
    if (answer) {
      answer.text = newText;
    }
  }

  addCommentToAnswer(id: number, comment: string, userId: number) {
    const answer = this.answers.find((answer) => answer.id === id);
    if (answer) {
      const commentId = answer.comments.length + 1;
      const newComment = {
        id: commentId,
        text: comment,
        userId,
        upvote: 0,
      };
      answer.comments.push(newComment);
      return newComment;
    }
    return null;
  }

  getCommentsByAnswerId(id: number) {
    const answer = this.answers.find((answer) => answer.id === id);
    if (answer) {
      return answer.comments.map((comment: any) => {
        const user = this.authService.getUser(comment.userId);
        return {
          ...comment,
          user,
        };
      });
    }
    return [];
  }






}