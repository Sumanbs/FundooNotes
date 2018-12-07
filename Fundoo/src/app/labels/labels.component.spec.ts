import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LabelsComponent } from "./labels.component";

describe("LabelsComponent", () => {
    let component: LabelsComponent;
    let fixture: ComponentFixture<LabelsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LabelsComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LabelsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
    it("Label should be valid"),
        async(() => {
            expect(component.NewLabel).toEqual("Suman");
            expect(component.NewLabel).toBeTruthy();
        });
    it("Invalid Form"),
        async(() => {
            expect(component.NewLabel).toEqual("");
            expect(component.NewLabel).toBeFalsy();
        });
});
