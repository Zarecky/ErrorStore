using System;

namespace ErrorStore.Models
{
    public class ErrorHistory
    {
        public enum ActionEnum
        {
            Input, Open, Resolve, Close    
        }
        
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public ActionEnum Action { get; set; }
        public string Comment { get; set; }
        public int UserId { get; set; }
        public int ErrorId { get; set; }
    }
}