import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments: string[] = []; // Array to store comments
  newComment: string = ''; // Variable to store the new comment input

  constructor() { }

  ngOnInit(): void {
    // Initialize the component
  }

  addComment() {
    if (this.newComment.trim() !== '') {
      this.comments.push(this.newComment); // Add the new comment to the array
      this.newComment = ''; // Clear the input field
    }
  }

  deleteComment(index: number) {
    this.comments.splice(index, 1); // Remove the comment at the specified index
  }
}
