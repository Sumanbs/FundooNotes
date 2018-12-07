import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CollaboratorComponent } from "./collaborator.component";

describe("CollaboratorComponent", () => {
    let component: CollaboratorComponent;
    let fixture: ComponentFixture<CollaboratorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CollaboratorComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CollaboratorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
    it("Label should be valid"),
        async(() => {
            expect(component.emailid).toEqual("suman789014@gmail.com");
            expect(component.emailid).toBeTruthy();
        });
    it("Invalid Form"),
        async(() => {
            expect(component.emailid).toEqual("");
            expect(component.emailid).toBeFalsy();
        });
});
