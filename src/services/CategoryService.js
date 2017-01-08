export default class CategoryService
{
    static getAllCategories()
    {
        const categories = $.get('http://localhost:8081/react-redux-crud/api/read_all_categories.php');
        return categories;
    }
}