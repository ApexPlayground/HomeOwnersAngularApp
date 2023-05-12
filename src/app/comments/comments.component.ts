import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Input() answerId: number = 0;
  comments: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    this.comments = this.dataService.getCommentsByAnswerId(this.answerId);
  }

  addComment(commentInput: HTMLInputElement) {
    const commentText = commentInput.value.trim();
    if (!commentText) {
      return;
    }
  }
}
