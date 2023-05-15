import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

// This is the setup code that runs before each test case.
// It configures the testing module environment.
describe('AppComponent', () => {
  beforeEach(async () => {


    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  // This is a test case to check if the app component is created successfully.
  it('should create the app', () => {

    // Creates an instance of the AppComponent for testing.
    const fixture = TestBed.createComponent(AppComponent);

    // Accesses the component instance.
    const app = fixture.componentInstance;

    // Asserts that the component instance is truthy, indicating that the component is successfully created.
    expect(app).toBeTruthy();

  });

  // This is a test case to check if the title property of the app component is set correctly.
  it(`should have as title 'AskMe'`, () => {


    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // Asserts that the title property of the app component is equal to 'AskMe'.
    expect(app.title).toEqual('question-answer');

  });

  // This is a test case to check if the title is rendered correctly in the app component's template.
  it('should render title', () => {

    // Triggers change detection to render the component and update the view.
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();


    // Accesses the compiled HTML element of the component.
    const compiled = fixture.nativeElement as HTMLElement;

    // Asserts that the rendered HTML contains the expected text content.
    expect(compiled.querySelector('.content span')?.textContent).toContain('question-answer app is running!');

  });
});
