import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-Item';
import { Section } from 'src/app/common/section';
import { CartService } from 'src/app/services/cart.service';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit {

  sections : Section[] = [];
  displaySectionImageUrl='assets/images/staffboxe.png';
  constructor(private sectionService : SectionService,
               private route : ActivatedRoute,
               private cartService : CartService) { }

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

  addToCart(section: Section){
    console.log(`Add to Cart: ${section.tarif},${section.sectionId}`);
    // 

    const theCartItem = new CartItem(section);
    this.cartService.addToCart(theCartItem);
  }

}
