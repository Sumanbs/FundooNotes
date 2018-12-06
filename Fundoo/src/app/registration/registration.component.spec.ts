import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RegistrationComponent } from "./registration.component";

describe("RegistrationComponent", () => {
    let component: RegistrationComponent;
    let fixture: ComponentFixture<RegistrationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegistrationComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegistrationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
    it("Registration should be valid", async(() => {
        expect(component.model.name).toEqual("suman");
        expect(component.model.pass).toEqual("aaaa");
        expect(component.model.phno).toEqual("123456789");
        expect(component.model.email).toEqual("suman789014@gmail.com");
        expect(component.model).toBeTruthy();
    }));
    it("Registration should be valid", async(() => {
        expect(component.model.name).toEqual("");
        expect(component.model.pass).toEqual("fkjd");
        expect(component.model.phno).toEqual("12345dffd6789");
        expect(component.model.email).toEqual("suman789014gmail.com");
        expect(component.model).toBeTruthy();
    }));
});
