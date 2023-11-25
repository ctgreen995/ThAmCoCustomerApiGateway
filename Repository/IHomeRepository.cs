namespace Repository
{
    public interface IHomeRepository
    {
        Task<List<string>> GetData();
    }
}