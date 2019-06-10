using System;

namespace ErrorStore.Models
{
    public class Error
    {
        public enum StateEnum
        {
            New, Opened, Resolved, Closed
        }

        public enum UrgencyEnum
        {
            VeryUrgent, Urgent, NonUrgent, NotUrgentAtAll 
        }

        public enum CriticalityEnum
        {
            Crash, Critical, Uncritical, Change
        }
        
        public int Id { get; set; }
        public DateTime CreateDate { get; set; }
        public string ShortDescription { get; set; }
        public string Description { get; set; }
        public StateEnum State { get; set; }
        public UrgencyEnum Urgency { get; set; }
        public CriticalityEnum Criticality { get; set; }
    }
}