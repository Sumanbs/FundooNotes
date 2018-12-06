import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NotesComponent } from "./notes.component";

describe("NotesComponent", () => {
    let component: NotesComponent;
    let fixture: ComponentFixture<NotesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NotesComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
    it("Notes creation should be valid", async(() => {
        expect(component.model.email).toEqual("suman789014gmail.com");
        expect(component.model.pass).toEqual("dfsdf");
        expect(component.model).toBeTruthy();
    }));
});
