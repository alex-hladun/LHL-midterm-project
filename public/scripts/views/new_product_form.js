
const $newProduct = $(`
<h1>Add a product!</h1>
<form id="add-product-form" method="POST" action="/api/products">
<label for="title">Title</label>
<input type="text" name="title" placeholder="Title" />
<label for="description">Description</label>
<input type="text" name="description" placeholder="Description" />
<label for="price">Price</label>
<input type="number" name="price" step="any" placeholder="$" />
<label for="category">Category</label>
<select name="category" id="categories-list"></select>
<label for="photo_url">Photo</label>
<input type="text" name="photo_url" placeholder="Photo URL" />
<button type="submit">Submit</button>
</form>
`);

const renderCategory = function(category) {
  const markup = `
  <option value="${category.category_id}">${category.category_name}</option>
  `;
  return markup;
};

const renderCategories = function(categoriesArray) {

  for (const category of categoriesArray) {
    const $cat = renderCategory(category);
    $newProduct.find('select').append($cat);
  }
};

getAllCategories()
.then(json => {
  console.log(json.categories);
  renderCategories(json.categories);
});



$('#add-product-form').on('submit', function(event) {
  event.preventDefault();
  const data = $(this).serialize();
  console.log(data);

  addProduct(data)
  .then(json => {
    views_manager.show('product');
  });
});


