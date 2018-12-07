import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UpdatecollaboratorComponent } from "./updatecollaborator.component";

describe("UpdatecollaboratorComponent", () => {
    let component: UpdatecollaboratorComponent;
    let fixture: ComponentFixture<UpdatecollaboratorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UpdatecollaboratorComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UpdatecollaboratorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
    it("Collaborator should be valid"),
        async(() => {
            expect(component.emailid).toEqual("suman789014@gmai.com");
            expect(component.emailid).toBeTruthy();
        });
    it("Invalid "),
        async(() => {
            expect(component.emailid).toEqual("");
            expect(component.emailid).toEqual("1111");
            expect(component.emailid).toEqual("sdss");
            expect(component.emailid).toBeFalsy();
        });
});
