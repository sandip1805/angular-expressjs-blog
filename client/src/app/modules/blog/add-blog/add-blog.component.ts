import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BlogsService } from 'src/app/shared/services/blogs.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {
  @Input() from: any = '';
  @Output() updateData: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private sanitizer: DomSanitizer,
    private activeModal: NgbActiveModal,
    private blogSvc: BlogsService,
    private toastrSvc: ToastrService,
  ) {}

  ngOnInit() {}

  form: FormGroup = new FormGroup({
    html: new FormControl("", Validators.required),
    title: new FormControl("", Validators.required),
    blogType: new FormControl("politics", Validators.required),
  });

  config: any = {
    airMode: false,
    tabDisable: true,
    popover: {
      table: [
        ["add", ["addRowDown", "addRowUp", "addColLeft", "addColRight"]],
        ["delete", ["deleteRow", "deleteCol", "deleteTable"]]
      ],
      image: [
        ["image", ["resizeFull", "resizeHalf", "resizeQuarter", "resizeNone"]],
        ["float", ["floatLeft", "floatRight", "floatNone"]],
        ["remove", ["removeMedia"], ["insert", ["picture"]]]
      ],
      link: [["link", ["linkDialogShow", "unlink"]]],
      air: [
        [
          "font",
          [
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "superscript",
            "subscript",
            "clear"
          ]
        ]
      ]
    },
    height: "200px",
    uploadImagePath: "/api/upload",
    toolbar: [
      ["misc", ["codeview", "undo", "redo", "codeBlock"]],
      [
        "font",
        [
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "superscript",
          "subscript",
          "clear"
        ]
      ],
      ["fontsize", ["fontname", "fontsize", "color"]],
      ["para", ["style0", "ul", "ol", "paragraph", "height"]],
      ["insert", ["table", "picture", "link", "video", "hr"]],
      ["customButtons", ["testBtn"]]
    ],
    codeviewFilter: true,
    codeviewFilterRegex: /<\/*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|ilayer|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|t(?:itle|extarea)|xml|.*onmouseover)[^>]*?>/gi,
    codeviewIframeFilter: true
  };

  get sanitizedHtml() {
    return this.sanitizer.bypassSecurityTrustHtml(this.form.get("html")?.value);
  }

  onBlur() {
    console.log("Blur");
  }

  onDelete(file: any) {
    console.log("Delete file", file.url);
  }

  summernoteInit(event: any) {
    console.log(event);
  }

  validateForm() {
    const value = this.form.getRawValue();

    if (value?.title === '' || !value?.title) {
      this.toastrSvc.warning('','Please enter a valid tile to continue.',{
        timeOut: 3000
      });
      return false;
    }

    if (value?.html === '' || !value?.html) {
      this.toastrSvc.warning('','Please enter a valid description to continue.',{
        timeOut: 3000
      });
      return false;
    }

    return true;
  }

  generateBody(value: any) {
    const date = new Date().toISOString().slice(0, 10);
    const body = {
      title: value?.title ? value?.title : '',
      description: value?.html ? value?.html : '',
      date: date
    }

    return body;
  }

  onSave() {
    const value = this.form.getRawValue();
    const validateForm = this.validateForm();
    if (!validateForm) return;
    const body = this.generateBody(value);
    this.continueSaveBlog(body, value?.blogType);
  }

  continueSaveBlog(body: any, blogType: any) {
    this.blogSvc.addBlog(body, blogType).subscribe(res => {
      if (res) {
        this.toastrSvc.success('','added successfully');
        this.updateData.emit(true);
        this.closeModal();
      }
      else {
        return;
      }
    })
  }

  closeModal() {
    this.activeModal.dismiss();
  }

}
