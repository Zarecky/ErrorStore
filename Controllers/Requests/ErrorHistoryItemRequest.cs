using ErrorStore.Models;

namespace ErrorStore.Controllers.Requests
{
    public class ErrorHistoryItemRequest
    {
        public int ErrorId { get; set; }
        public ErrorHistory.ActionEnum Action { get; set; }
        public string Comment { get; set; }
    }
}