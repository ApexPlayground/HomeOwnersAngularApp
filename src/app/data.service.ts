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
    {
      text: 'How to code a basic website using HTML and CSS?',
      id: 3,
      userId: 1,
    },
    {
      text: 'What are the key differences between Python and Java, and when should you use each one?',
      id: 4,
      userId: 3,
    },
    {
      text: 'How can you use Git to manage your code changes and collaborate with others?',
      id: 5,
      userId: 2,
    },
  ];

  answers = [
    {
      id: 1,
      questionId: 1,
      text: "Practice balancing, pedaling, and steering. Wear a helmet for safety. With practice, you'll gain confidence and enjoy riding a bike.",
      userId: 3,
      upvote: 10,
      downvote: 0,
      comments: []

    },
    {
      id: 2,
      questionId: 1,
      text: 'Put your leg on the pedal and start riding',
      userId: 2,
      upvote: 2,
      downvote: 0,
      comments: []

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
    {
      id: 1,
      questionId: 5,
      text: 'Git allows you to track changes, collaborate with others, and easily revert to previous versions.',
      userId: 3,
      upvote: 10,
      downvote: 0,
      comments: []

    },
    {
      id: 2,
      questionId: 5,
      text: 'Git is a powerful tool for version control, enabling you to work with others and manage complex projects.',
      userId: 1,
      upvote: 8,
      downvote: 0,
      comments: [],
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

        };
      });
  }

  votedAnswers: Set<number> = new Set<number>(); // Set to track voted answer IDs

  upvoteAnswer(id: number) {
    const answer = this.answers.find((a) => a.id === id);
    if (answer) {
      if (this.votedAnswers.has(id)) {
        answer.upvote = Math.max(answer.upvote - 1, 0); // Toggle downvote
        this.votedAnswers.delete(id);
      } else {
        if (answer.upvote === -1) {
          answer.upvote = 1; // Remove previous downvote and toggle upvote
          answer.downvote = 0;
        } else {
          answer.upvote += 1; // Toggle upvote
          answer.downvote = Math.max(answer.downvote - 1, 0); // Remove downvote if any
        }
        this.votedAnswers.delete(id); // Remove any previous downvote from votedAnswers set
        this.votedAnswers.add(id); // Add the ID to votedAnswers set
      }
    }
  }

  downvoteAnswer(id: number) {
    const answer = this.answers.find((a) => a.id === id);
    if (answer) {
      if (this.votedAnswers.has(id)) {
        answer.upvote += 1; // Toggle upvote
        answer.downvote = Math.max(answer.downvote - 1, 0); // Remove downvote if any
        this.votedAnswers.delete(id);
      } else {
        if (answer.upvote === 1) {
          answer.upvote = 0; // Toggle downvote
          answer.downvote = 1;
        } else {
          answer.upvote -= 1; // Toggle downvote
          answer.downvote = Math.max(answer.downvote + 1, 0); // Remove upvote if any
        }
        this.votedAnswers.delete(id); // Remove any previous upvote from votedAnswers set
        this.votedAnswers.add(id); // Add the ID to votedAnswers set
      }
    }
  }




  deleteAnswer(id: number): void {
    const answerIndex = this.answers.findIndex((answer) => answer.id === id);
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

  deleteQuestion(id: any): void {
    const index = this.questions.findIndex(question => question.id === id);
    if (index !== -1) {
      this.questions.splice(index, 1);
    }
  }

  editQuestion(id: any, newText: string): void {
    const question = this.questions.find(question => question.id === id);
    if (question) {
      question.text = newText;
    }
  }

  addComment(answerId: number, commentText: string, userId: number) {
    const commentId = this.generateCommentId();
    const comment = {
      id: commentId,
      text: commentText,
      userId: userId,
    };

    const answer = this.answers.find((a) => a.id === answerId);
    if (answer) {
      if (!answer.comments) {
        answer.comments = [];
      }
      answer.comments.push(comment);
    }

    return true;
  }

  deleteComment(answerId: number, commentId: number) {
    const answer = this.answers.find((a) => a.id === answerId);
    if (answer && answer.comments) {
      const commentIndex = answer.comments.findIndex((c) => c.id === commentId);
      if (commentIndex !== -1) {
        answer.comments.splice(commentIndex, 1);
      }
    }
  }

  private generateCommentId(): number {
    // Find the maximum comment ID and add 1
    let maxCommentId = 0;
    this.answers.forEach((answer) => {
      if (answer.comments) {
        answer.comments.forEach((comment) => {
          if (comment.id > maxCommentId) {
            maxCommentId = comment.id;
          }
        });
      }
    });
    return maxCommentId + 1;
  }

}