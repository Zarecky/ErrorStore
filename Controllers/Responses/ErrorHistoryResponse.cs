using System;
using ErrorStore.Models;

namespace ErrorStore.Controllers.Responses
{
    public class ErrorHistoryResponse
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public ErrorHistory.ActionEnum Action { get; set; }
        public string Comment { get; set; }
        public UserResponse User { get; set; }
    }
}