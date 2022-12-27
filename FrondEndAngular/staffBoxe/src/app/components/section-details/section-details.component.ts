import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-Item';
import { Section } from 'src/app/common/section';
import { CartService } from 'src/app/services/cart.service';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-section-details',
  templateUrl: './section-details.component.html',
  styleUrls: ['./section-details.component.css']
})
export class SectionDetailsComponent implements OnInit {

idSection : string | null |undefined;
header='Section';
isNewSection = false ;
section : Section ={
  id: 0,
  sectionId: '',
  description: '',
  name: '',
  tarif: 0,
  imageUrl: '',
  content:''
}
  constructor(private sectionService: SectionService,
                private router: Router,
                private snackbar:MatSnackBar,
                private cartService : CartService,
                private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idSection = this.route.snapshot.paramMap.get('id')!;
      if(this.idSection){     
        //If the route contains the 'Add'
        if(this.idSection.toString().toLowerCase()=== 'Add'.toLowerCase()){
          // New student fonctionnality
             this.isNewSection = true;
             this.header ="Add New Section";
        }else{
          // Existing adherent functionnality
            this.isNewSection = false;
            this.header ="Update Section";
        }
        this.loadSectionById();
        }


  }

  loadSectionById(){
    const sectionId : number = +this.route.snapshot.paramMap.get('id')!;
    //  this.adherentId = +this.route.snapshot.paramMap.get('id')!;
      this.sectionService.getSectionById(sectionId).subscribe(
        (sucessResponse)=>{
          this.section = sucessResponse;
        }
      );
  }
  onAdd() {
    throw new Error('Method not implemented.');
    }
    onDelete() {
    throw new Error('Method not implemented.');
    }
    onUpdate():void{
      this.sectionService.putUpdateSection(this.section.id,this.section)
      .subscribe((successResponse)=>{
        //Show notification
        this.snackbar.open('Section updated successfully', undefined,
        {duration: 2500});
        setTimeout(()=>{
          this.router.navigateByUrl('home');
         }, 3000);
      console.log(successResponse);
      },(error)=>{
  
      }) ; 
  }
    addToCart(section: Section){
      console.log(`Add to Cart: ${section.tarif},${section.sectionId}`);
      // 
      const theCartItem = new CartItem(section);
      this.cartService.addToCart(theCartItem);
  
    }
}
