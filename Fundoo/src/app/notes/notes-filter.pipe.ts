import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "notesFilter"
})
export class NotesFilterPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    debugger;
    if (!args) return value;
    return value.filter(items => {
      return (
        items.Note.includes(args) == true || items.Title.includes(args) == true
      );
    });
  }
}
