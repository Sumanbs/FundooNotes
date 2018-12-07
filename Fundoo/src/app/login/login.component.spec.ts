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
    it("Form should be valid"),
        async(() => {
            expect(component.model.name).toEqual("Suman");
            expect(component.model.name).toEqual("Suman B S");
            expect(component.model.name).toEqual("Suman123");
            expect(component.model.name).toEqual("Holla");
            expect(component.model.email).toEqual("suman789014@gmail.com");
            expect(component.model.password).toEqual("as*");
            expect(component.model.password).toEqual("12345678");
            expect(component.model.number).toEqual("4343");
            expect(component.model.name).toBeTruthy();
            expect(component.model.email).toBeTruthy();
            expect(component.model.password).toBeTruthy();
            expect(component.model.number).toBeTruthy();
        });
    it("Invalid Form"),
        async(() => {
            expect(component.model.name).toEqual("");
            expect(component.model.email).toEqual("");
            expect(component.model.password).toEqual("");
            expect(component.model.number).toEqual("");
            expect(component.model.name).toBeFalsy();
            expect(component.model.email).toBeFalsy();
            expect(component.model.password).toBeFalsy();
            expect(component.model.number).toBeFalsy();
        });
});
