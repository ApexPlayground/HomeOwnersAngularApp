import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) { }

  addComment(commentInput: HTMLInputElement) {
    const commentText = commentInput.value.trim();
    if (!commentText) {
      return;
    }

    // Add your logic here to handle comment addition
    // You can call the necessary service method to add the comment
    //this.dataService.addCommentToAnswer(this.dataService.getAnswersById[], commentText, this.authService.currentLoggedInUser.id);

    commentInput.value = ''; // Clear the comment input after adding the comment
  }
}
