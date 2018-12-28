import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


import { ToDoService } from 'src/app/Services/to-do.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/catagory.service';
@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  id;
  cname;
  // name: string = "";
  // category: string = "";
  // status: boolean = false;

  @ViewChild('category') category: ElementRef;
  constructor(
    public toDoService: ToDoService,
    private router: Router,
    private route: ActivatedRoute,
    public cat: CategoryService
  ) { this.cname = cat.catname }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
      }
    );
  }

  onSubmitOfEdit(name: HTMLInputElement, status: HTMLInputElement) {
    this.toDoService.tasks[this.id].name = name.value;
    this.toDoService.tasks[this.id].category = this.category.nativeElement.value;
    this.toDoService.tasks[this.id].status = status.checked;
    //console.log(name);
    // this.showListPage.emit();
    this.router.navigate(['todo'], { relativeTo: this.route })
  }

  onCancleOfEdit() {
    this.router.navigate(['todo'], { relativeTo: this.route })
    // this.cancleClicked.emit();
  }
}
