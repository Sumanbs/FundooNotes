import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RemindersComponent } from "./reminders.component";

describe("RemindersComponent", () => {
    let component: RemindersComponent;
    let fixture: ComponentFixture<RemindersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RemindersComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RemindersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
    it("Reminders creation should be valid"),
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
