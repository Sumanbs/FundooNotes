import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ArchivenoteComponent } from "./archivenote.component";

describe("ArchivenoteComponent", () => {
    let component: ArchivenoteComponent;
    let fixture: ComponentFixture<ArchivenoteComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ArchivenoteComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ArchivenoteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
    it("Archive note display should be valid"),
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
