export function RecipeOutput({ recipeText }: { recipeText: string }) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Your Recipe</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body class="p-4">
        <div class="container">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title mb-4">Your Generated Recipe</h2>
              <div class="recipe-content">
                ${recipeText.split('\n').map(line => `<p>${line}</p>`).join('')}
              </div>
              <div class="mt-4">
                <button class="btn btn-primary" onclick="window.history.back()">Generate Another Recipe</button>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
} 