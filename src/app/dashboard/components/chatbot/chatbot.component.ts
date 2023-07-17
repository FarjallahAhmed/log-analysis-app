import { style } from '@angular/animations';
import { Component,OnInit } from '@angular/core';
import { ChatbotService } from '../../services/chatbot.service';


interface SearchResult {
  url: string;
  votes: number;
  title: string;
  body: string;
  similarity_score: number;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {
  submitted: boolean = false;
  query: string = '';
  resultReturned: boolean = true;
  numResults: number = 5;
  searchResults: SearchResult[] = [];
  tags: string[] = [];

  constructor(private searchService: ChatbotService) {}

  ngOnInit() {}

  onQueryChange() {
    if (this.query.length > 0) {
      this.submitted = true;
      this.searchService.getSearchResults(this.query, this.numResults).subscribe(
        (response) => {
          //this.tags = response.tags[0];
          this.searchResults = response.results;
        },
        (error) => {
          console.error('Error: ' + error);
        }
      );
    } else {
      setTimeout(() => {
        this.submitted = false;
        this.searchResults = [];
        this.tags = [];
      }, 700);
    }
  }
}
