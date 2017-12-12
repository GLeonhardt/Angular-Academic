using System;

namespace Academic.Models
{

 public class State
    {
        public Guid id { get; set; } = Guid.NewGuid();
        public string Name { get; set; } = "";
    }
}