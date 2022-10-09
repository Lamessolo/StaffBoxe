import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Section } from 'src/app/common/section';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit {

  sections : Section[] = [];
  constructor(private sectionService : SectionService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listSections();
    });
  }

  listSections(){
    this.sectionService.getSectionList().subscribe(
      data => {
        this.sections = data;
      });
  }

}
