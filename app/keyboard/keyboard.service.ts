import { android as androidApp } from '@nativescript/core/application';

export class ZaghawaKeyboardService extends android.inputmethodservice.InputMethodService {
    private keyboardView: android.view.View;
    private inputConnection: android.view.inputmethod.InputConnection;

    public onCreate(): void {
        super.onCreate();
        this.initKeyboard();
    }

    public onCreateInputView(): android.view.View {
        return this.keyboardView;
    }

    private initKeyboard(): void {
        const context = this;
        const layoutInflater = context.getSystemService(android.content.Context.LAYOUT_INFLATER_SERVICE);
        
        this.keyboardView = layoutInflater.inflate(org.nativescript.zaghawaKeyboard.R.layout.keyboard_layout, null);
        
        // Initialize keyboard buttons and handlers
        this.setupKeyboardButtons();
    }

    private setupKeyboardButtons(): void {
        // Add click listeners for each key
        const keys = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
            'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u',
            'v', 'w', 'x', 'y', 'z'
        ];

        keys.forEach(key => {
            const buttonId = this.getResources().getIdentifier(
                `key_${key}`,
                'id',
                this.getPackageName()
            );
            
            const button = this.keyboardView.findViewById(buttonId);
            button.setOnClickListener(new android.view.View.OnClickListener({
                onClick: () => this.onKeyClick(key)
            }));
        });
    }

    private onKeyClick(key: string): void {
        this.inputConnection = this.getCurrentInputConnection();
        if (this.inputConnection != null) {
            // Apply Zaghawa Beria font to the input
            const spannableString = new android.text.SpannableString(key);
            const typeface = android.graphics.Typeface.createFromAsset(
                this.getAssets(),
                "fonts/ZaghawaBeria.otf"
            );
            
            spannableString.setSpan(
                new android.text.style.TypefaceSpan(typeface),
                0,
                key.length,
                android.text.Spanned.SPAN_EXCLUSIVE_EXCLUSIVE
            );
            
            this.inputConnection.commitText(spannableString, 1);
        }
    }
}