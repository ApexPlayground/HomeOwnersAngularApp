import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

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

  newText: string = " "


  editComment(index: number, newText: string) {
    Swal.fire({
      title: 'Edit Comment',
      input: 'text',
      inputValue: newText,
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value || value.trim() === '') {
          return 'Please enter a comment';
        }
        return null; // Return null to indicate a valid input
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.comments[index] = result.value;
        Swal.fire('Comment Updated!', '', 'success');
      }
    });
  }
}
