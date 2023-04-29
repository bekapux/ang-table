import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

interface Header {
  isVisible: boolean;
  name: string;
  sortOrder: number;
}

interface DataRow {
  [key: string]: string | number;
}

@Component({
  selector: 'app-draggable-table',
  templateUrl: './draggable-table.component.html',
  styleUrls: ['./draggable-table.component.scss'],
})
export class DraggableTableComponent implements OnInit {
  public headers: Header[] = [
    { sortOrder: 2, isVisible: true, name: 'Lastname' },
    { sortOrder: 1, isVisible: true, name: 'Firstname' },
    { sortOrder: 3, isVisible: true, name: 'Age' },
  ];
  public headerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.headerForm = this.fb.group({
      headers: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    const headerFormArray = this.headerForm.get('headers') as FormArray;
    this.headers.forEach((header) => {
      headerFormArray.push(
        this.fb.group({
          name: [header.name],
          isVisible: [header.isVisible, Validators.required],
          sortOrder: [header.sortOrder, [Validators.required, Validators.min(1), Validators.max(this.headers.length)]],
        })
      );
    });
  }

  public data: DataRow[] = [
    { firstname: 'Beka', lastname: 'Pukhashvili', age: 10 },
    { firstname: 'Denis', lastname: 'Kachurovskiy', age: 20 },
    { firstname: 'Yevgeniy', lastname: 'Pavlov', age: 1 },
  ];

  get visibleHeaders(): Header[] {
    return this.headers
      .filter((x) => x.isVisible === true)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  applyChanges() {
    const updatedHeaders = this.headerForm.get('headers')!.value;
    this.headers = updatedHeaders;
  }
}
