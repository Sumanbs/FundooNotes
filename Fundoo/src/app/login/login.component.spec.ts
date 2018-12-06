import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginComponent } from "./login.component";

describe("LoginComponent", () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it("checks if hello tests is tests", () =>
        expect("getPasswordErrorMessage").toBe("getPasswordErrorMessage"));
    it("Login should be valid", async(() => {
        expect(component.model.email).toEqual("suman789014gmail.com");
        expect(component.model.pass).toEqual("dfsdf");
        expect(component.model).toBeTruthy();
    }));
});
