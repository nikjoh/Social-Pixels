namespace RetroChatRestApi.Models.Account
{
    internal class LoginResponse
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public bool LoggedIn { get; set; }
        public string Text { get; set; }
    }
}