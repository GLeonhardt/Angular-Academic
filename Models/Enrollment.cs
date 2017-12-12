using System;

namespace Academic.Models
{

    public class Enrollment
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string dateEnrollment { get; set; } = System.DateTime.Now.ToString("dd/MM/yyyy");
        public string Hour { get; set; } =System.DateTime.Now.ToShortTimeString();
        public Student Student { get; set; }
        public Guid StudentId{get; set;}
        public Classroom Classroom { get; set; }
        public Guid ClassroomId {get; set;}
    }

}