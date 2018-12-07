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

        expect(component.model).toBeTruthy();
    }));
    it("Notes creation should be valid", async(() => {
        expect(component.model.title).toEqual("suman");
        expect(component.model.note).toEqual("asdf");
        expect(component.model).toBeTruthy();
    }));
    it("Notes creation should be valid", async(() => {
        expect(component.model.title).toEqual("");
        expect(component.model.note).toEqual("asdf");
        expect(component.model).toBeTruthy();
    }));
    it("Notes should be valid"),
        async(() => {
            expect(component.model.note).toEqual("Suman");
            expect(component.model.title).toEqual("Suman B S");
            expect(component.color).toEqual("#f01234");
            expect(component.model.remainderDateTime).toEqual("Holla");
            expect(component.email).toEqual("suman789014@gmail.com");

            expect(component.model.note).toBeTruthy();
            expect(component.model.title).toBeTruthy();
            expect(component.color).toBeTruthy();
            expect(component.email).toBeTruthy();
        });
    it("Invalid Form"),
        async(() => {
            expect(component.model.note).toEqual("");
            expect(component.model.title).toBeFalsy();
            expect(component.color).toBeFalsy();
        });
});
